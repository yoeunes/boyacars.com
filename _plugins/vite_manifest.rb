require 'json'

module Jekyll
  class ViteManifest
    MANIFEST_PATH = 'assets/vite/.vite/manifest.json'

    def self.manifest(site)
      @manifest ||= begin
        manifest_file = File.join(site.source, MANIFEST_PATH)
        if File.exist?(manifest_file)
          JSON.parse(File.read(manifest_file))
        else
          {}
        end
      end
    end

    def self.asset_path(site, entry)
      manifest = self.manifest(site)
      entry_data = manifest[entry]
      if entry_data && entry_data['file']
        "/assets/vite/#{entry_data['file']}"
      else
        # Fallback for development or missing manifest
        "/assets/vite/#{entry.sub(/\.js$/, '.js').sub(/\.css$/, '.css')}"
      end
    end

    def self.css_files(site, entry)
      manifest = self.manifest(site)
      entry_data = manifest[entry]
      if entry_data && entry_data['css']
        entry_data['css'].map { |css| "/assets/vite/#{css}" }
      else
        # Fallback: assume main.css exists
        ["/assets/vite/main.css"]
      end
    end
  end

  class ViteJsTag < Liquid::Tag
    def initialize(tag_name, entry, tokens)
      super
      @entry = entry.strip.empty? ? 'entrypoints/application.js' : entry.strip
    end

    def render(context)
      site = context.registers[:site]
      path = ViteManifest.asset_path(site, @entry)
      %(<script type="module" src="#{path}"></script>)
    end
  end

  class ViteCssTag < Liquid::Tag
    def initialize(tag_name, entry, tokens)
      super
      @entry = entry.strip.empty? ? 'entrypoints/application.js' : entry.strip
    end

    def render(context)
      site = context.registers[:site]
      css_files = ViteManifest.css_files(site, @entry)
      css_files.map { |path| %(<link rel="stylesheet" href="#{path}">) }.join("\n")
    end
  end

  # Reset manifest cache on site reset
  Hooks.register :site, :after_reset do |site|
    ViteManifest.instance_variable_set(:@manifest, nil)
  end
end

Liquid::Template.register_tag('vite_js', Jekyll::ViteJsTag)
Liquid::Template.register_tag('vite_css', Jekyll::ViteCssTag)

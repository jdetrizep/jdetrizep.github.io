# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name     = "klise"
  spec.version  = "1.0.1"
  spec.authors  = ["Jorge De Trinidad Zepeda"]
  spec.email    = ["jorgedetrinidad@outlook.com"]

  spec.summary  = "Blog de desarrolladores"
  spec.homepage = "https://github.com/jdetrizep/jdetrizep.dev"
  spec.license  = "MIT"

  spec.metadata["plugin_type"] = "theme"
  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(_(includes|layouts|sass)/|(assets|LICENSE|README)((\.(txt|md|markdown|yml)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.1"
  spec.add_runtime_dependency 'jekyll-feed', '~> 0.13'
  spec.add_runtime_dependency 'jekyll-sitemap', '~> 1.4'
  spec.add_runtime_dependency 'jekyll-compose', '~> 0.12.0'
  spec.add_runtime_dependency 'jekyll-postfiles', '~> 3.1'

  spec.add_development_dependency "bundler", "~> 2.1"
end

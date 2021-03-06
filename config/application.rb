require File.expand_path('../boot', __FILE__)

require 'rails/all'



# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module EventsFinal
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    
    config.exceptions_app = self.routes

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    
    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_record.default_timezone = :local
    
    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
    
    
  
    
    #local env for Production remove if Condition and add Production env info
    if Rails.env.development?
      local_env = File.join(Rails.root, 'config', 'local_env.yml')
      CONFIG = HashWithIndifferentAccess.new(YAML::load(IO.read(local_env)))[Rails.env]
      CONFIG.each do |k,v|
        ENV[k.upcase] ||= v
      end
    end
    
    
  end
end

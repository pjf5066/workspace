RailsAdmin.config do |config|
  
  config.main_app_name = ["Events Control Panel", "Events Group"]

  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
     warden.authenticate! scope: :user
  end
  
  config.current_user_method(&:current_user)
  
  ## == Cancan ==
  config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  config.model 'User' do
    object_label_method do
      :custom_label_method
    end
  end
  
  def custom_label_method
    "#{email}"
  end
  
  config.excluded_models << Page

  ## == PaperTrail ==
  #config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    clone
    show
    edit
    delete
    show_in_app
    all
    import
    ## With an audit adapter, you can add:
    
    #history_index
    #history_show
  end
end
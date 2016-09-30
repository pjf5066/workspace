class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def all_third
    user = User.from_omniauth(request.env["omniauth.auth"])
    if user.persisted?
      flash[:success] = "You have successfully logged in"
      sign_in_and_redirect user
    else
      session["devise.user_attributes"] = user.attributes
      redirect_to new_user_registration_url
    end
  end
  
  alias_method :twitter, :all_third
  alias_method :linkedin, :all_third
  alias_method :google_oauth2, :all_third
end
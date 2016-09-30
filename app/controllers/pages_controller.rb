class PagesController < ApplicationController
  
  before_action :authenticate_user!, only: [:welcome, :list, :resetcounter]
  
  layout "infographics", only: [:infographics]
  
  def index
    if user_signed_in?
      redirect_to "/welcome"
    end
  end

  
  def welcome

  end
  
end
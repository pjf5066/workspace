class ProfilesController < ApplicationController
  
  before_action :authenticate_user!
  
  before_action :if_condition, only: [:edit, :view, :show]

  load_and_authorize_resource

  # GET /profiles
  # GET /profiles.json
  def index
    redirect_to root_path
  end

  # GET /profiles/1
  # GET /profiles/1.json
  def show
    @profile = Profile.find(params[:id])
  end

  # GET /profiles/1/edit
  def edit
  end

  # PATCH/PUT /profiles/1
  # PATCH/PUT /profiles/1.json
  def update
    respond_to do |format|
      if @profile.update(profile_params)
        format.html { redirect_to edit_profile_path(), notice: 'Profile was successfully updated.' }
        format.json { render :show, status: :ok, location: @profile }
      else
        format.html { render :edit }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    
    def if_condition
      
      @profile = Profile.find(params[:id])

      if @profile.state_id
        @show_state = State.find(@profile.state_id).name
      else
        @show_state = 'n/a'
      end
 
      if @profile.city
        @show_city = @profile.city
      else
        @show_city = 'n/a'
      end
      
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def profile_params
      params.require(:profile).permit(:user_id, :first_name, :last_name, :address, :city, :state_id, :zip_code, :phone, :avatar, :gender_id, :slug_id, :twitter, :facebook, :linkedin, :googleplus)
    end
    
    #NDM Require Same User to edit it own Profile
    def require_same_user
      @profile = Profile.find(params[:id])
      if @profile.user_id != current_user.id
        flash[:danger] = "You are not right User to made this changes"
        redirect_to root_path
      end
    end
end
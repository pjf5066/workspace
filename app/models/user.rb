class User < ActiveRecord::Base
  before_create :set_default_role
  after_create :create_user_profile
  
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :timeoutable, :lockable, :zxcvbnable

  belongs_to :role
  
  has_one :profile, :dependent => :destroy

  validates :terms_of_service, acceptance: true

  def self.from_omniauth(auth)
    #check if user exist if not than update profile with Info
    matchuser = where(provider: auth.provider, uid: auth.uid).first
    useromni = where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      #binding.pry
      user.email = auth.info.email || "#{auth.uid}@twitter.com"
      user.skip_confirmation!
    end
    if matchuser.nil?
      if auth.provider == "google_oauth2"
        useromni.profile.update_attributes(:avatar => auth.info.image, :first_name => auth.info.first_name, :last_name => auth.info.last_name)
      end
      if auth.provider == "twitter"
        useromni.profile.update_attributes(:avatar => auth.info.image, :twitter => auth.info.urls.Twitter)
      end
      if auth.provider == "linkedin"
        useromni.profile.update_attributes(:phone => auth.info.phone, :avatar => auth.info.image, :linkedin => auth.info.urls.public_profile, :first_name => auth.info.first_name, :last_name => auth.info.last_name)
      end
      useromni.profile.save!(validate: false)
    end
    useromni
  end
  
  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"], without_protection: true) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end
  
  def password_required?
    super && provider.blank?
  end
  
  def update_with_password(params, *option)
    if encrypted_password.blank?
      update_attributes(params, *option)
    else
      super
    end
  end
  
  
  private
  
  def set_default_role
    self.role ||= Role.find_by_name('user')
  end  
  
  def create_user_profile
      create_profile(:user_id => self)
  end
  
end
class Profile < ActiveRecord::Base
 
  #generate Slug_id for links
  include Slug
  
  validates :first_name, presence: true, length: { in: 2..25 }, :on => :update
  validates :last_name, presence: true, length: { in: 2..25 }, :on => :update
  validates :state_id, presence: true, numericality: { only_integer: true }, :on => :update
  validates :city, presence: true, length: { in: 2..25 }, :on => :update
  validates :address, presence: true, length: { in: 2..25 }, :on => :update
  
  validate :validate_state_id, :on => :update
  
  validates_length_of :zip_code, minimum: 5, too_short: 'please enter at least 5 characters', :on => :update
  validates_length_of :phone, in: 8..11, allow_blank: true, :on => :update
  
  belongs_to :user
  has_one :state
  has_one :gender
  
  
  #one more step to prevent user_id change
  validate :user_id_not_changed

  has_attached_file :avatar, :styles => { :small => '128x128#', :large => '350x350#', :original => '600x600#' }, :default_style => :large

  # Validate the attached image is image/jpg, image/png, etc
    validates_attachment :avatar,
    content_type: { content_type: ["image/jpeg", "image/png"] },
    size: { in: 0..1.megabytes }

  private

  #validating state id valid you can add wrong state id
  def validate_state_id
    errors.add(:state_id, "is invalid") unless State.exists?(self.state_id)
  end

  def user_id_not_changed
    if user_id_changed? && self.persisted?
      errors.add(:user_id, "Change of user_id not allowed!")
    end
  end  
  
end

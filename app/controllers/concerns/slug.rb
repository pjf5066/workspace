module Slug
  extend ActiveSupport::Concern

  included do
    before_create :generate_slug
  end

  protected

  def generate_slug
    self.slug_id = loop do
      random_slug = SecureRandom.urlsafe_base64(nil, false)
      break random_slug unless self.class.exists?(slug_id: random_slug)
    end
  end
end
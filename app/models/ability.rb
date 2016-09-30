class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user.role_id == 4 #admin
      can :manage, :all
      can :import, :all
      
    elsif user.role_id == 3 #Resume Moderator  
      can :manage, :all
      cannot :manage, User
      
    elsif user.role_id == 2 #Resume Business
      can :update, Profile, :user_id => user.id
      
    elsif user.role_id == 1 #Resume User
      
      can :update, Profile, :user_id => user.id
      
    end
  end
  
end 
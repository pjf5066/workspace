require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "create user with e-mail" do 
    user = User.create(:email => "admin@example.com")
    
    assert_equal(user.email, "admin@example.com")
  end
  
  test "create user with username" do 
    user = User.create(:username => "admin")
    
    assert_equal(user.username, "admin")
  end
end

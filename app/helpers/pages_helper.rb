module PagesHelper
    
    
    
    def first_last_show_full_w
        @user_resume = current_user.profile
        if @user_resume.first_name? && @user_resume.last_name?
            "#{@user_resume.first_name} #{@user_resume.last_name}"
        else
            "Name: n/a"
        end
    end
    
    def phone_show_w
        @user_resume = current_user.profile
        if @user_resume.phone?
            "Phone: #{@user_resume.phone}"
        else
            "Phone: n/a"
        end
    end
    
    def email_show_w
        "Email: #{current_user.email}"
    end
    
    def avatar_show
        if @user_resume.avatar.present?
            image_tag(@user_resume.avatar.url(:large), :class => "img-thumbnail img-responsive")
        else
            image_tag("/images/small-avatar.png", :class => "img-thumbnail img-responsive")
        end
    end
end
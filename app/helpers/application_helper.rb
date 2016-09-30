module ApplicationHelper
  
  def header(text)
    content_for(:header) { text.to_s }
  end
  
  def profile_id_user
    Profile.find_by(user_id: current_user)
  end
  
  def edit_resume
    if can? :update, Resume
      link_to '<i class="glyphicon glyphicon-pencil"></i>'.html_safe, edit_resume_path(), class: 'btn-xs btn-primary' 
    end  
  end
  
  def edit_workexperience(field1, field2)
    if can? :update, Workexperience
      link_to '<i class="glyphicon glyphicon-pencil"></i>'.html_safe, edit_resume_workexperience_path(field1, field2), class: 'btn-xs btn-primary' 
    end  
  end

  def edit_education(field1, field2)
    if can? :update, Education
      link_to '<i class="glyphicon glyphicon-pencil"></i>'.html_safe, edit_resume_education_path(field1, field2), class: 'btn-xs btn-primary' 
    end  
  end
  
  def edit_skill(field1, field2)
    if can? :update, Skill
      link_to '<i class="glyphicon glyphicon-pencil"></i>'.html_safe, edit_resume_skill_path(field1, field2), class: 'btn-xs btn-primary' 
    end  
  end
  
  def edit_portfolio(field1, field2)
    if can? :update, Skill
      link_to '<i class="glyphicon glyphicon-pencil"></i>'.html_safe, edit_resume_portfolio_path(field1, field2), class: 'btn-xs btn-primary' 
    end  
  end
  
  def delete_me(field1, field2)
    if can? :destroy, Skill or can? :destroy, Workexperience or can? :destroy, Education
       link_to '<i class="glyphicon glyphicon-trash"></i>'.html_safe, [field1, field2], method: :delete, data: { confirm: 'Are you sure?' }, class: 'btn-xs btn-danger' 
    end  
  end
  
  #Show avatar for user on edit page and profile View
  def show_avatar
      @profile = current_user.profile
    if @profile.avatar.present?
      image_tag(@profile.avatar.url(:large), :class => "img-thumbnail img-responsive")
    else
      image_tag("/images/avatar.png", :class => "img-thumbnail img-responsive")
    end      
  end
  
  #Show email only if user is logged in
  def show_email
    if user_signed_in?
      "Email: #{current_user.email}"
    end     
  end
  
  def star_rating(value)
      if value == 1 
        "<i class='fa fa-star yellow'></i>".html_safe
      elsif value == 2
        "<i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i>".html_safe
      elsif value == 3
        "<i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i>".html_safe
      elsif value == 4
        "<i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i>".html_safe
      elsif value == 5
        "<i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i><i class='fa fa-star yellow'></i>".html_safe
    end
  end
  
  
end
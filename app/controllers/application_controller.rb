class ApplicationController < ActionController::Base
  def current_user
    user = User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authorize
    current_user.nil?
  end
end

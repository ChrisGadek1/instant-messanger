class User < ApplicationRecord
  scope :get_by_email, ->(email) { where(email: email) }
  scope :get_by_username, ->(username) { where(username: username) }
end

require 'validators/registration/email_validator'
require 'bcrypt'

class User < ApplicationRecord
  alphanumeric_regex = /\A[A-Za-z0-9]+\z/
  has_secure_password

  has_one_attached :avatar
  has_and_belongs_to_many :conversations

  validates :name, presence: true, length: { minimum: 2, maximum: 100 }, format: { with: alphanumeric_regex }
  validates :surname, presence: true, length: { minimum: 2, maximum: 100 }, format: { with: alphanumeric_regex }
  validates :username, presence: true, length: { minimum: 2, maximum: 100 }, uniqueness: true, format: { with: alphanumeric_regex, message: "this is not a valid email format" }
  validates :email, presence: true, length: { minimum: 2, maximum: 100 }, uniqueness: true, email: true
  
  scope :get_by_email, ->(email) { where(email: email) }
  scope :get_by_username, ->(username) { where(username: username) }
end

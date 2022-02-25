class GroupConversation < ApplicationRecord
  has_one :avatar
  has_and_belongs_to_many :users
  has_many :messages
end

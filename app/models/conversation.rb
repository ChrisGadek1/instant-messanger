class Conversation < ApplicationRecord
  has_many :messages
  has_one :avatar
  has_and_belongs_to_many :users
end

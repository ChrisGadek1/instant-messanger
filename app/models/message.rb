class Message < ApplicationRecord
  belongs_to :private_conversation
  belongs_to :group_conversation
  has_one :user
  has_many_attached :attachments
end

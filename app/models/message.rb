class Message < ApplicationRecord
  belongs_to :conversation
  has_one :user
  has_many_attached :attachments
end

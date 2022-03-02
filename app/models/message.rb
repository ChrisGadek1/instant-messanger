class Message < ApplicationRecord
  belongs_to :user
  belongs_to :conversation
  has_many_attached :attachments
end

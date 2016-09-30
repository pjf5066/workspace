# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

['user', 'business', 'moderator', 'admin'].each do |role|
  Role.find_or_create_by({name: role})
end

Gender.create([
  { :name => 'Male'},
  { :name => 'Female'},
  { :name => 'Other'},
  { :name => 'It’s Complicated'}
])

State.create([
  { :name => 'Alabama', :abbreviation => 'AL'},
  { :name => 'Alaska', :abbreviation => 'AK'},
  { :name => 'Arizona', :abbreviation => 'AZ'},
  { :name => 'Arkansas', :abbreviation => 'AR'},
  { :name => 'California', :abbreviation => 'CA'},
  { :name => 'Colorado', :abbreviation => 'CO'},
  { :name => 'Connecticut', :abbreviation => 'CT'},
  { :name => 'Delaware', :abbreviation => 'DE'},
  { :name => 'District of Columbia', :abbreviation => 'DC'},
  { :name => 'Florida', :abbreviation => 'FL'},
  { :name => 'Georgia', :abbreviation => 'GA'},
  { :name => 'Hawaii', :abbreviation => 'HI'},
  { :name => 'Idaho', :abbreviation => 'ID'},
  { :name => 'Illinois', :abbreviation => 'IL'},
  { :name => 'Indiana', :abbreviation => 'IN'},
  { :name => 'Iowa', :abbreviation => 'IA'},
  { :name => 'Kansas', :abbreviation => 'KS'},
  { :name => 'Kentucky', :abbreviation => 'KY'},
  { :name => 'Louisiana', :abbreviation => 'LA'},
  { :name => 'Maine', :abbreviation => 'ME'},
  { :name => 'Maryland', :abbreviation => 'MD'},
  { :name => 'Massachusetts', :abbreviation => 'MA'},
  { :name => 'Michigan', :abbreviation => 'MI'},
  { :name => 'Minnesota', :abbreviation => 'MN'},
  { :name => 'Mississippi', :abbreviation => 'MS'},
  { :name => 'Missouri', :abbreviation => 'MO'},
  { :name => 'Montana', :abbreviation => 'MT'},
  { :name => 'Nebraska', :abbreviation => 'NE'},
  { :name => 'Nevada', :abbreviation => 'NV'},
  { :name => 'New Hampshire', :abbreviation => 'NH'},
  { :name => 'New Jersey', :abbreviation => 'NJ'},
  { :name => 'New Mexico', :abbreviation => 'NM'},
  { :name => 'New York', :abbreviation => 'NY'},
  { :name => 'North Carolina', :abbreviation => 'NC'},
  { :name => 'North Dakota', :abbreviation => 'ND'},
  { :name => 'Ohio', :abbreviation => 'OH'},
  { :name => 'Oklahoma', :abbreviation => 'OK'},
  { :name => 'Oregon', :abbreviation => 'OR'},
  { :name => 'Pennsylvania', :abbreviation => 'PA'},
  { :name => 'Rhode Island', :abbreviation => 'RI'},
  { :name => 'South Carolina', :abbreviation => 'SC'},
  { :name => 'South Dakota', :abbreviation => 'SD'},
  { :name => 'Tennessee', :abbreviation => 'TN'},
  { :name => 'Texas', :abbreviation => 'TX'},
  { :name => 'Utah', :abbreviation => 'UT'},
  { :name => 'Vermont', :abbreviation => 'VT'},
  { :name => 'Virginia', :abbreviation => 'VA'},
  { :name => 'Washington', :abbreviation => 'WA'},
  { :name => 'West Virginia', :abbreviation => 'WV'},
  { :name => 'Wisconsin', :abbreviation => 'WI'},
  { :name => 'Wyoming', :abbreviation => 'WY'}
])

user = User.new(
      :email                 => "admin@events.com",
      :password              => "password",
      :password_confirmation => "password",
      :role_id               => 4
)
user.skip_confirmation!
user.save!
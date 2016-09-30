# README OPEN Events #
## Open Events Documentation ##
### Important File Location ###

**Asset Compiling**

```
#!ruby
Rails.application.config.assets.precompile += %w( infographics.css )
Rails.application.config.assets.precompile += %w( infographics.js )
```

**config/local_env.yml file**

```
#!ruby
S3_BUCKET:                test
S3_KEY_ACCESS:            R9QehzH+sadasd/sd/asdasdasdgw32f
S3_KEY_ID:                asdasf3rafasdasd
```

**Paperclip with AWS connection /app/models/profile**

```
#!ruby
  has_attached_file :avatar, :styles => { :small => '128x128#', :large => '350x350#', :original => '600x600#' }, :default_style => :large,
    :storage => :s3,
    :default_url => '/images/:attachment/missing_:style.png',
    :path => "profiles/:id/avatar/:style.:extension",
    
    :s3_protocol => 'https',
    :s3_credentials => {
      :bucket => ENV['S3_BUCKET'],
      :access_key_id => ENV['S3_KEY_ID'],
      :secret_access_key => ENV['S3_KEY_ACCESS'],
    }

  # Validate the attached image is image/jpg, image/png, etc
    validates_attachment :avatar,
    content_type: { content_type: ["image/jpeg", "image/png"] },
    size: { in: 0..1.megabytes }
    
```

**Install Libraries for captcha for ubuntu for GEM rmagick 2.15.4  https://github.com/phatworx/easy_captcha **

# ./config/application.rb
require 'net/http'

```
#!shell
sudo apt-get install libmagickwand-dev
```
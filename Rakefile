ARTIFACTS = './artifacts'
PACKAGE="#{ARTIFACTS}/app.tar.gz"
APP = './app'


task :clean_package do
  sh "rm -rf #{PACKAGE}" if Dir.exists? ARTIFACTS
end

task :clean => :clean_package


task :setup do
  Dir.mkdir ARTIFACTS unless Dir.exists? ARTIFACTS
end


task :package => [:setup, :clean_package] do
  sh "tar czvf #{PACKAGE} #{APP}/css/*.css #{APP}/img/*.jpg #{APP}/*.html #{APP}/js/*.js #{APP}/lib/moment/* #{APP}/lib/angular/angular.min.js"
end

task :transfer do
  sh "scp #{PACKAGE} "
end
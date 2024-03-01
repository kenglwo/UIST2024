FROM ruby:3.0.0
EXPOSE 3003

# RUN apt-get update -qq && apt-get install -y curl apt-transport-https wget && \
# 	curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs \
# 	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
# 	apt-get update && apt-get install -y yarn \
# 	build-essential \
#     libpq-dev \
#     nodejs \
#     postgresql-client

RUN wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list
RUN set -x && apt-get update -y -qq && apt-get install -yq nodejs yarn
RUN apt-get install -yq postgresql-client build-essential

WORKDIR /backend
COPY ./Gemfile /backend/Gemfile
COPY ./Gemfile.lock /backend/Gemfile.lock
COPY .env.development /backend/.env.development

# RUN bundle update mimemagic
# RUN bundle config set --local path 'vendor/bundle'
RUN bundle config set force_ruby_platform true
RUN bundle install 

RUN yarn install --check-files

# CMD [ "bundle", "exec", "rails" , "s", "-p" , "3001", "-b", "0.0.0.0"]






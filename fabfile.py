from fabric.api import cd, env, run, task, sudo, put
from fabric.colors import green, red

import time

env.use_ssh_config = True
env.forward_agent = True
env.output_prefix = False

gitUrl = 'https://github.com/marmelab/javascript-boilerplate.git'

@task
def setup_api():
    print(green('Installing dependencies ...'))
    sudo('apt --yes update && apt --yes upgrade')
    sudo('curl -sL https://deb.nodesource.com/setup_5.x | bash -')
    sudo('apt --yes install build-essential')
    sudo('apt --yes install libkrb5-dev')
    sudo('apt --yes install nodejs')
    sudo('apt --yes install supervisor')
    sudo('apt --yes install git htop vim')
    run('npm set progress=false')
    run("npm config set save-prefix='~'")

    run('git clone %s %s/%s' % (gitUrl, env.home, env.api_pwd))

@task
def check():
    run('git --version')
    run('node --version')
    run('service supervisor status')
    run('supervisord --version')

@task
def deploy_api(branch='master'):
    with cd('%s/%s' % (env.home, env.api_pwd)):
        run('git fetch')
        run('git checkout %s' % branch)
        run('git pull')
        run('make install-prod')
        put(env.supervisord_source, '/etc/supervisor/conf.d/%s' % env.supervisord_dest, use_sudo=True)

    sudo('supervisorctl restart %s' % env.api_name)

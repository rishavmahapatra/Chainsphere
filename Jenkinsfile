pipeline {
    agent {
        label 'reactjs2'
    }
    stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "CI=false npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "rsync -rav --delete build/* administrator@172.16.0.235:/var/www/html/react-pipeline/icodashboard-asad-23034069-reactjs-uatv3/"
                sh "echo v3icodashboard-asad.mobiloitte.io"
            }
        }

    }
}

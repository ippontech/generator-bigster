var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Next, add your custom code
        this.option('coffee'); // This method adds support for a `--coffee` flag

        // This makes `appname` a required argument.
        // this.argument('appname', { type: String, required: true });
    },

    prompting: function () {
        return this.prompt([{
            name    : 'name',
            type    : 'input',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, {
            name    : 'language',
            type    : 'list',
            message : 'Programming language',
            choices: [
                {
                    value: 'scala',
                    name: 'Scala'
                },
                {
                    value: 'java',
                    name: 'Java'
                },
                {
                    value: 'kotlin',
                    name: 'Kotlin'
                }
            ],
            default : 'scala'
        }, {
            name    : 'scalaVersion',
            type    : 'list',
            message : 'Scala version',
            choices: [
                {
                    value: '2.11.8',
                    name: '2.11'
                },
                {
                    value: '2.10.6',
                    name: '2.10'
                }
            ],
            default : '2.11',
            when: function (answers) {
                return answers.language == "scala"
            }
        }, {
            name    : 'buildTool',
            type    : 'list',
            message : 'Build tool',
            choices: [
                {
                    value: 'maven',
                    name: 'Maven'
                },
                {
                    value: 'sbt',
                    name: 'SBT'
                }
            ],
            default : 'maven',
            when: function (answers) {
                return answers.language == "scala"
            }
        }
        ]).then(function (answers) {
            this.answers = answers;
            if (answers.scalaVersion) {
                answers.scalaDepVersion = this.answers.scalaVersion.substring(0, 4);
            }
        }.bind(this));
    },

    writing: function () {
        if (this.answers.buildTool == "sbt") {
            this.fs.copyTpl(
                this.templatePath('build.sbt'),
                this.destinationPath('build.sbt'),
                {
                    name: this.answers.name,
                    scalaVersion: this.answers.scalaVersion,
                    scalaDepVersion: this.answers.scalaDepVersion
                }
            );
        } else {
            this.fs.copyTpl(
                this.templatePath('pom.xml'),
                this.destinationPath('pom.xml'),
                {
                    name: this.answers.name,
                    language: this.answers.language,
                    scalaVersion: this.answers.scalaVersion,
                    scalaDepVersion: this.answers.scalaDepVersion
                }
            );
        }

        this.fs.copyTpl(
            this.templatePath('src/main/resources/_log4j.properties'),
            this.destinationPath('src/main/resources/log4j.properties')
        );

        if (this.answers.language == "scala") {
            this.fs.copyTpl(
                this.templatePath('src/main/scala/com/bigster/_Driver.scala'),
                this.destinationPath('src/main/scala/com/bigster/Driver.scala')
            );
            this.fs.copyTpl(
                this.templatePath('src/main/scala/com/bigster/_Main.scala'),
                this.destinationPath('src/main/scala/com/bigster/Main.scala')
            );
        } else if (this.answers.language == "java") {
            this.fs.copyTpl(
                this.templatePath('src/main/java/com/bigster/_Driver.java'),
                this.destinationPath('src/main/java/com/bigster/Driver.java')
            );
            this.fs.copyTpl(
                this.templatePath('src/main/java/com/bigster/_Main.java'),
                this.destinationPath('src/main/java/com/bigster/Main.java')
            );
        } else if (this.answers.language == "kotlin") {
            this.fs.copyTpl(
                this.templatePath('src/main/kotlin/com/bigster/_Driver.kt'),
                this.destinationPath('src/main/kotlin/com/bigster/Driver.kt')
            );
            this.fs.copyTpl(
                this.templatePath('src/main/kotlin/com/bigster/_Main.kt'),
                this.destinationPath('src/main/kotlin/com/bigster/Main.kt')
            );
        }
    }
});

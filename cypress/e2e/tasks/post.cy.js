/// <reference types="cypress" />
describe('POST /task', () => {

    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('CT-001 register new task', function () {
        const { user, task } = this.tasks.create
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user, task)
            .then(userResp => {
                cy.task('removeTask', task.name, user.email)

                cy.postTask(task, userResp.body.token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        expect(response.body.name).to.eq(task.name)
                        expect(response.body.tags).to.eql(task.tags)
                        expect(response.body.user).to.eq(userResp.body.user._id)
                        expect(response.body.is_done).to.be.false
                        expect(response.body._id.length).to.eq(24)
                    })
            })
    })
    it('CT-002 register duplicated task', function () {
        const { user, task } = this.tasks.create
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user, task)
            .then(userResp => {
                cy.task('removeTask', task.name, user.email)

                cy.postTask(task, userResp.body.token)
                cy.postTask(task, userResp.body.token)
                    .then(response => {
                        expect(response.status).to.eq(409)
                        expect(response.body.message).to.eq('Duplicated task!')
                    })
            })
    })
    it('CT-003 empty fields', function () {
        const { user, task } = this.tasks.emptyField
        cy.task('removeUser', user.email)
        cy.postUser(user)

        cy.postSession(user, task)
            .then(userResp => {
                cy.task('removeTask', task.name, user.email)

                cy.postTask(task, userResp.body.token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        expect(response.body.message).to.eq('ValidationError: \"name\" is not allowed to be empty')                        
                    })
            })
    })
})



/// <reference types="cypress" />
describe('POST /task', () => {

    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })

    })

    context('CT-001 register a new task', function () {
        before(function () {
            cy.purgeQueueMessages()
                .then(response => {
                    expect(response.status).to.eq(204)
                })

        })
        it('post task', function () {
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
        after(function () {
            cy.wait(3000)
            const { user, task } = this.tasks.create
            cy.getQueueMessages()
                .then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.body[0].payload).to.include(user.name.split(' ')[0])
                    expect(response.body[0].payload).to.include(task.name)
                    expect(response.body[0].payload).to.include(user.email)
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



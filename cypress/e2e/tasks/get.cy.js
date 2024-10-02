/// <reference types="cypress" />

describe('GET / tasks', () => {
    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('CT-001 get all tasks', function () {
        const { user, tasks } = this.tasks.list

        cy.task('removeUser', user.email)
        cy.task('removeTaskLike', 'Estud4r')
        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {

                tasks.forEach(function (t) {
                    cy.postTask(t, userResp.body.token)
                })

                cy.getTasks(userResp.body.token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        expect(response.body).to.be.an('array')
                        expect('have.length', tasks.length)
                    })
            })
    })
});
describe('GET / tasks/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('CT-002 get unique tasks', function () {
        const { user, task } = this.tasks.unique

        cy.task('removeUser', user.email)
        cy.task('removeTask', task.name, task.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.getUniqueTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                            })
                    })
            })
    })
    it('CT-003 task not found', function () {
        const { user, task } = this.tasks.notFound

        cy.task('removeUser', user.email)
        cy.task('removeTask', task.name, task.email)

        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.deleteTask(taskResp.body._id, userResp.body.token)
                           .then(taskResp => {
                            expect(taskResp.status).to.eq(204)
                           })

                        cy.getUniqueTask(taskResp.body._id, userResp.body.token)
                         .then(response => {
                            expect(response.status).to.eq(404)
                         })


                        
                    })
            })
    })
});

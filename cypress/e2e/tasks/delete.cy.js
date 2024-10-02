/// <reference types="cypress" />

describe('DELETE/ tasks', () => {
    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('CT-001 remove a task', function () {
        const { user, task } = this.tasks.remove

        cy.task('removeUser', user.email)
        cy.task('removeTask', task.name, task.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.deleteTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)

                            })
                    })
            })
    })
    it('CT-002 not found a task to remove', function () {
        const { user, task } = this.tasks.not_found

        cy.task('removeUser', user.email)
        cy.task('removeTask', task.name, task.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.deleteTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)

                            })
                        cy.deleteTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                            })
                    })
            })
    })
});
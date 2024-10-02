/// <reference types="cypress" />

describe('PUT/ tasks/:id/done', () => {
    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })
    it('CT-001 update task - done', function () {
        const { user, task } = this.tasks.update

        cy.task('removeUser', user.email)
        cy.task('removeTask', task.name, task.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.putTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)
                            })
                        cy.getUniqueTask(taskResp.body._id, userResp.body.token)
                          .then(response => [
                            expect(response.body.is_done).to.be.true
                          ])
                    })
            })
    })
    it('CT-002 not found a task to update', function () {
        const { user, task } = this.tasks.not_found

        cy.task('removeUser', user.email)
        cy.task('removeTask', task.name, task.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(userResp => {
                cy.postTask(task, userResp.body.token)
                    .then(taskResp => {
                        cy.putTask(taskResp.body._id, userResp.body.token)
                        cy.putTask(taskResp.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)

                            })
                    })
            })
    })
});
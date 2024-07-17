export class LoadingTitleHandler {
    count
    currString
    static loading
    timeoutId
    static MAX_LOADING_DOTS = 6

    constructor() {
        this.count = 0
        this.loading = false
        this.currString = ""
        this.timeoutId = null
    }

    getLoadingString() {
        return this.currString + '.'.repeat(this.count)
    }
    
    startLoading(loadingString = 'BOOTING') {
        this.count = 0
        this.loading = true
        this.currString = loadingString

        this.scheduleNextLoading()
    }

    scheduleNextLoading() {
        this.timeoutId = setTimeout(() => this.continueLoading(), 400)
    }

    continueLoading() {
        if (this.loading) {
            this.count = (this.count + 1) % (LoadingTitleHandler.MAX_LOADING_DOTS + 1)
            this.publishTitle(this.getLoadingString())
            this.scheduleNextLoading()
        }else{
            this.stopLoading()
        }
    }

    stopLoading(finishedString = "Kode With Kyle") {
        this.loading = false
        this.currString = finishedString
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
        this.publishTitle()
    }

    publishTitle(str = undefined) {
        if (!str)
            document.title = this.currString
        else
            document.title = str
    }
}

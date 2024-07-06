//class meant to handle changes in title
export class LoadingTitleHandler{
    count
    currString
    loading
    static MAX_LOADING_DOTS = 6
    constructor(){
        this.count = 0
        this.loading = false
        this.currString = ""
    }

    getLoadingString(){
        return this.currString + '.'.repeat(this.count)
    }
    
    startLoading(loadingString = 'BOOTING'){
        this.count = 0
        this.loading = true
        this.currString = loadingString

        setTimeout(() => this.continueLoading(), 400)
    }

    continueLoading(){
        if(this.loading){
            this.count = (this.count + 1) % (LoadingTitleHandler.MAX_LOADING_DOTS + 1)
            this.publishTitle(this.getLoadingString())
            setTimeout(() => this.continueLoading(), 400)
        }
    }

    stopLoading(finishedString = "Software Engineer"){
        this.loading = false;
        this.currString = finishedString;
        this.publishTitle();
    }

    publishTitle(str=undefined){
        if(!str)
            document.title = this.currString
        else
            document.title = str
    }
}
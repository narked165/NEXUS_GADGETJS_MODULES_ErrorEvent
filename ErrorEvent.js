/*
*   NAME: error/index.js
*   DESCRIPTION: Logs an error, in JSON to a text file, then logs it to the info console.
*   DATE: September 7, 2020
*   AUTHOR: Paul H.Fabing
*   FILE: Node Module - text/js
*
* */


//  Node Required Depdancies
const fs = require('fs'),
    path = require('path')


//  Main Object (Literal)
const ErrorEvent = {


    //  Serializd Path String to errorlog
    ERRORlOG: path.join(`${__dirname}/error.txt`).toString(),


    // Private Method to format an error from type, dexcription, and timestamp
    formatError(type, description, timestamp) {
      return  { name: type, description: description, timestamp }
    },


    //  Private console.warn method call for pre-formatted error.
    callout(error) {
        console.warn(error)
    },

    //  Private, asyncronous, file-Append method
    logout(error) {
        fs.appendFile(this.ERRORlOG, JSON.stringify(error) + '\n', (err) => {
            if(err) {
                console.error(err)
            }
        })
    },



    //  Errors object
    errors: {},


    //  private timestamp method
    timestamp() {
        let _d = new Date()
        return _d.toLocaleTimeString()
    },



    //  API Export:  pushes error->errors, writes to a file, and logs the error event to stdout
    errorEvent(type, description) {
        let ts = this.timestamp()
        let former = this.formatError(type, description, ts)
        this.errors[ts] = this.errors[ts] || []
        this.errors[ts].push(former)
        this.callout(former)
        this.logout(former)
    }


}

module.exports = ErrorEvent

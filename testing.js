var Queue = function() {

    var isInit = false;
    var queue = [];

    return {

        onInit: function(callback) {
            if (isInit) {
                callback();
            } else {
                queue.push(callback);
            }
        },

        init: function() {
            while (queue.length) {
                (queue.shift())();
            }

            isInit = true;
        }

    };

}();



// Basic usage

Queue.onInit(function() {
    // App might not be defined at this point
    App.doSomething();
});

Queue.onInit(function() {
    App.doSomethingElse();
});

// Later on, after App has been initialised, the items are processed in the order that they were queued.
// App.doSomething() is run, and then App.doSomethingElse()
Queue.init();

Queue.onInit(function() {
    // Any items added after the queue has already been processed will be run straight away
});

module.exports = Queue

import _ from 'lodash';
import RAF from 'raf';
import VirtualScroll from 'virtual-scroll';
import ReactDOM from 'react-dom';

const EASE = 0.1;

class SmoothScrollManager {

    constructor() {
        this.elements = [];
        this.run = this.run.bind(this);
        this.isRunning = false;
        this.isStopped = false;
    }

    add(element, ease, update, yStart) {
        if (this.findElement(element)) {
            return false;
        }

        var virtual = new VirtualScroll({});

        virtual.on(this.onScroll.bind(this, element));

        var object = {
            el : element,
            virtual : virtual,
            ease : ease,
            update : update,
            targetY: yStart || 0,
            currentY: yStart || 0,
            paused : false
        };

        this.elements.push(object);

        if (this.elements.length > 0 && !this.isRunning) {
            this.isRunning = true;
            RAF.add(this.run);
        }
    }

    pause(element) {
        var object = this.findElement(element);
        object.paused = true;
    }

    resume(element) {
        var object = this.findElement(element);
        object.paused = false;
    }

    findElement(element) {
        return _.find(this.elements, function(o) {
            return o.el === element;
        });
    }

    remove(element) {
        var object = this.findElement(element);

        if (!object) {
            return;
        }

        object.virtual.off(this.onScroll.bind(this, element));
        object.virtual.destroy();

        _.remove(this.elements, function(item) {
            return item.el === element;
        });
        if (this.elements.length === 0) {
            this.isRunning = false;
            RAF.remove(this.run);
        }
    }

    resetPosition(element, position) {
        var object = this.findElement(element);
        object.currentY = position ? position : 0;
        object.targetY = position ? position : 0;
    }

    onScroll(element, e) {
        if (this.isStopped) return false;
        var object = this.findElement(element);
        if (object.paused) return false;
        object.sectionHeight = object.el.getBoundingClientRect().height;
        object.targetY += e.deltaY;
        object.targetY = Math.max( (object.sectionHeight - window.innerHeight) * -1, object.targetY);
        object.targetY = Math.min(0, object.targetY);
    }

    stopScroll(bool) {
        this.isStopped = bool;
        bool ? RAF.remove(this.run) : RAF.add(this.run);
    }

    run() {
        _.forEach(this.elements, (element) => {
            if (elemeent.paused) return true;
            element.update && element.update(element.targetY);
            element.currentY += (element.targetY - element.currentY) * (element.ease ? element.ease : EASE);
            var t = 'translateY(' + element.currentY + 'px) translateZ(0)';
            var s = element.el.style;
            s["transform"] = t;
            s["webkitTransform"] = t;
            s["mozTransform"] = t;
            s["msTransform"] = t;
        });
    }
}

var smoothScrollManager = new SmoothScrollManager();

var SmoothScrollDecorator = function decorator(target) {
    var componentDidMount = target.prototype.componentDidMount,
        componentWillUnmount = target.prototype.componentWillUnmount;

    // ComponentDidMount
    target.prototype.componentDidMount = function() {
        var el = ReactDOM.findDOMNode(this);
        smoothScrollManager.add(el);
        componentDidMount && componentDidMount.call(this);
    };

    // ComponentWillUnmount
    target.prototype.componentWillUnmount = function() {
        var el = ReactDOM.findDOMNode(this);
        smoothScrollManager.remove(el);
        componentWillUnmount && componentWillUnmount.call(this);
    };
};

export default {smoothScrollManager, SmoothScrollDecorator}

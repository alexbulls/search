 class Search {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        if (!options) {
            return;
        }

        const merged = this.options = this._extendOptions(options);

        if (!merged.path && !merged.itemSelector && !merged.parentSelector && !merged.itemPattern && !merged.sortFieldName && !merged.searchSelector) {
            return;
        }

        if (this._isTypeObject(merged.initialData) === 'function') {
            this.data = merged.initialData();
        }

        if (!this.data) {
            return;
        }

        this.data.sort(this._sortByField(merged.sortFieldName));
        this.parent = document.querySelector(this.options.parentSelector);

        if (!this.parent) {
            return;
        }

        this.defaultMarkup = this.parent.innerHTML;
        
        document.addEventListener('input', this._inputEvent);
    }

    _inputEvent = ({target}) => {
        const parent = this.parent;
        const options = this.options;
        const serchField = target.closest(`${options.searchSelector}`);

        if (!serchField) {
            return;
        }

        const value = target.value;

        if (!value.length) {
            parent.innerHTML = this.defaultMarkup;
            return;
        }

        let resultData = '';

        const data = this.data;
        const matches = this._getSearchMatches(value, data);

        if (!matches.length) {
            parent.innerHTML = 'Not found';
            return;
        }

        for (let match of matches) {
            resultData += this._getItemPattern(match);
        }

        parent.innerHTML = resultData;
    };

    // matches

    _getSearchMatches(value, list) {
        value = value.toLowerCase();

        const matches = [];
        const nameField = this.options.sortFieldName;
    
        for (let item of list) {
            if (item[nameField].toLowerCase().startsWith(value)) {
                matches.push(item);
            }
        }

        return matches;
    }

    // pattern

    _getItemPattern(data) {
        let pattern = this.options.itemPattern;

        for (let key in data) {
            const regexp = new RegExp(`\{${key}\}`,'g');
            pattern = pattern.replace(regexp, data[key]);
        }
        
        return pattern;
    }

    // abstract

    _sortByField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    _isTypeObject(object) {
        return Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
    }

    _extendOptions(options) {
        return Object.assign({
            path: null,
            initialData: null,
            itemSelector: '',
            parentSelector: '',
            searchSelector: '',
            itemPattern: null,
            sortFieldName: null,
        }, options)
    }
}
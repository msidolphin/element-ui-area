function oneOf (val, values = []) {
    return values.indexOf(val) !== -1
}

export default {
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        level: {
            type: Number,
            default: 3,
            validator (val) {
                return val >= 1 && val <= 3
            }
        },
        size: {
            type: String,
            default: 'small',
            validator (val) {
                return oneOf(val, ['mini', 'small', 'medium'])
            }
        }
    },
    watch: {
        level (val) {
            if (val >= 1 && val <= 4) {
                this.__initOptionsByValue()
            }
        }
    },
    data () {
        return {
            model: [],
            options: [],
            text: []
        }
    }
}

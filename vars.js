class SetVariableBlock {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            "id": "SparkyUtilsExtensionVars",
            "name": "Variables",
            "color1": "#FF8C1A",
            "blocks": [
                {
                    "opcode": "setVariableToValue",
                    "blockType": "command",
                    "text": "Set [VARIABLE] in [SPRITE] to [VALUE]",
                    "arguments": {
                        "VARIABLE": {
                            "type": "string",
                            "defaultValue": "my variable"
                        },
                        "SPRITE": {
                            "type": "string",
                            "defaultValue": "Sprite1"
                        },
                        "VALUE": {
                            "type": "number",
                            "defaultValue": 0
                        }
                    }
                },
                {
                    "opcode": "increaseVariableBy",
                    "blockType": "command",
                    "text": "Increase [VARIABLE] in [SPRITE] by [VALUE]",
                    "arguments": {
                        "VARIABLE": {
                            "type": "string",
                            "defaultValue": "my variable"
                        },
                        "SPRITE": {
                            "type": "string",
                            "defaultValue": "Sprite1"
                        },
                        "VALUE": {
                            "type": "number",
                            "defaultValue": 1
                        }
                    }
                },
                {
                    "opcode": "decreaseVariableBy",
                    "blockType": "command",
                    "text": "Decrease [VARIABLE] in [SPRITE] by [VALUE]",
                    "arguments": {
                        "VARIABLE": {
                            "type": "string",
                            "defaultValue": "my variable"
                        },
                        "SPRITE": {
                            "type": "string",
                            "defaultValue": "Sprite1"
                        },
                        "VALUE": {
                            "type": "number",
                            "defaultValue": 1
                        }
                    }
                }
            ],
            "menus": {}
        };
    }

    setVariableToValue({ VARIABLE, SPRITE, VALUE }) {
        let target;
        if (SPRITE.toLowerCase() === "stage") {
            target = Scratch.vm.runtime.getTargetForStage().variables;
        } else {
            target = Scratch.vm.runtime.getSpriteTargetByName(SPRITE).variables;
        }

        const variable = this.findVariableByName(target, VARIABLE);
        if (!variable) {
            console.error(`Variable "${VARIABLE}" not found in sprite "${SPRITE}".`);
            return;
        }

        variable.value = VALUE;
    }

    increaseVariableBy({ VARIABLE, SPRITE, VALUE }) {
        let target;
        if (SPRITE.toLowerCase() === "stage") {
            target = Scratch.vm.runtime.getTargetForStage().variables;
        } else {
            target = Scratch.vm.runtime.getSpriteTargetByName(SPRITE).variables;
        }

        const variable = this.findVariableByName(target, VARIABLE);
        if (!variable) {
            console.error(`Variable "${VARIABLE}" not found in sprite "${SPRITE}".`);
            return;
        }

        variable.value += VALUE;
    }

    decreaseVariableBy({ VARIABLE, SPRITE, VALUE }) {
        let target;
        if (SPRITE.toLowerCase() === "stage") {
            target = Scratch.vm.runtime.getTargetForStage().variables;
        } else {
            target = Scratch.vm.runtime.getSpriteTargetByName(SPRITE).variables;
        }

        const variable = this.findVariableByName(target, VARIABLE);
        if (!variable) {
            console.error(`Variable "${VARIABLE}" not found in sprite "${SPRITE}".`);
            return;
        }

        variable.value -= VALUE;
    }

    findVariableByName(variablesObject, name) {
        for (let key in variablesObject) {
            const variable = variablesObject[key];
            if (variable.name === name) {
                return variable;
            }
        }
        return null;
    }
}

Scratch.extensions.register(new SetVariableBlock());

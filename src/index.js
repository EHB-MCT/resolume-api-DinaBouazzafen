
document.addEventListener('DOMContentLoaded', function () {
    let firstFirstButton = true
    let firstSecondbutton = true
    let SecondSecondbutton = false
    const buttons = [
        { button: document.getElementById('resolumeButton1'), startcolumn: 22, columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], nextColumn: 23 },
        { button: document.getElementById('resolumeButton2'), startcolumn: [21,22], columns: [14, 15, 16, 17, 18, 19, 20], nextColumn: 23 },
    ];

    let startcolumnArray= [21,22]

    buttons.forEach(({ button, columns, nextColumn, startcolumn }, index) => {
        let usedColumns = [];
        let lastUsedColumn = null;

        button.addEventListener('click', function (btn) {
            let randomColumn;
            if (columns.length > 0) {
                if(firstFirstButton && btn.target.id == "resolumeButton1"){
                    firstFirstButton = false
                    for (let layer = 1; layer <= 4; layer++) {
                        (function (layer, randomColumn) {
                            const command = `http://00.0.00.00:8080/api/v1/composition/layers/${layer}/clips/${startcolumn}/connect`;
        
                            fetch(command, {
                                method: 'POST',
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log(`Resolume button ${index + 1} pressed successfully for layer ${layer}, column ${randomColumn}.`);
                                } else {
                                    console.error(`Failed to trigger Resolume button ${index + 1} for layer ${layer}, column ${randomColumn}.`);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                        })(layer, randomColumn);
                    }
                    return
                } 
                 if(firstSecondbutton && btn.target.id == "resolumeButton2" && SecondSecondbutton == false){
                    firstSecondbutton = false
                    SecondSecondbutton = true
                    for (let layer = 1; layer <= 4; layer++) {
                        (function (layer, randomColumn) {
                            const command = `http://00.0.00.00:8080/api/v1/composition/layers/${layer}/clips/21/connect`;
                            fetch(command, {
                                method: 'POST',
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log(`Resolume button ${index + 1} pressed successfully for layer ${layer}, column ${randomColumn}.`);
                                } else {
                                    console.error(`Failed to trigger Resolume button ${index + 1} for layer ${layer}, column ${randomColumn}.`);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                        })(layer, randomColumn);
                    }
                    return
                }
                 if(!firstSecondbutton && btn.target.id == "resolumeButton2" && SecondSecondbutton){
                    SecondSecondbutton = false
                    for (let layer = 1; layer <= 4; layer++) {
                        (function (layer, randomColumn) {
                            const command = `http://00.0.00.00:8080/api/v1/composition/layers/${layer}/clips/22/connect`;
                            fetch(command, {
                                method: 'POST',
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log(`Resolume button ${index + 1} pressed successfully for layer ${layer}, column ${randomColumn}.`);
                                } else {
                                    console.error(`Failed to trigger Resolume button ${index + 1} for layer ${layer}, column ${randomColumn}.`);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                        })(layer, randomColumn);
                    }
                    return;
                }
                randomColumn = columns[Math.floor(Math.random() * columns.length)];
                const columnIndex = columns.indexOf(randomColumn);
                columns.splice(columnIndex, 1);
            } else {
                randomColumn = nextColumn;
            }

            lastUsedColumn = randomColumn;

            for (let layer = 1; layer <= 4; layer++) {
                (function (layer, randomColumn) {
                    const command = `http://00.0.00.00:8080/api/v1/composition/layers/${layer}/clips/${randomColumn}/connect`;
                    fetch(command, {
                        method: 'POST',
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Resolume button ${index + 1} pressed successfully for layer ${layer}, column ${randomColumn}.`);
                        } else {
                            console.error(`Failed to trigger Resolume button ${index + 1} for layer ${layer}, column ${randomColumn}.`);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                })(layer, randomColumn);
            }
        });
    });
});





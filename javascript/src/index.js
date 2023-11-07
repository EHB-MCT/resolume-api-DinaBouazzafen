document.addEventListener('DOMContentLoaded', function () {
    const buttons = [
        { button: document.getElementById('resolumeButton1'), columns: [1, 2, 3], nextColumn: 7 },
        { button: document.getElementById('resolumeButton2'), columns: [4, 5, 6], nextColumn: 8 },
    ];

    buttons.forEach(({ button, columns, nextColumn }, index) => {
        let usedColumns = [];
        let lastUsedColumn = null;

        button.addEventListener('click', function () {
            let randomColumn;

            if (columns.length > 0) {
                randomColumn = columns[Math.floor(Math.random() * columns.length)];
                const columnIndex = columns.indexOf(randomColumn);
                columns.splice(columnIndex, 1);
            } else {
                randomColumn = nextColumn;
            }

            lastUsedColumn = randomColumn;

            for (let layer = 1; layer <= 3; layer++) {
                const command = `http://10.2.88.30:8080/api/v1/composition/layers/${layer}/clips/${randomColumn}/connect`;

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
            }
        });
    });
});




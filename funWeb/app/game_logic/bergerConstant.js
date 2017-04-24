const ROUNDS_BERGER = {
    4: [
        	['1:4','2:3'],
        	['4:3','1:2'],
        	['2:4','3:1']
    ],
    6: [
        	['1:6','2:5','3:4'],
        	['6:4','5:3','1:2'],
        	['2:6','3:1','4:5'],
        	['6:5','1:4','2:3'],
        	['3:6','4:2','5:1']
    ],
    8: [
            ['1:8','2:7','3:6','4:5'],
            ['8:5','6:4','7:3','1:2'],
            ['2:8','3:1','4:7','5:6'],
            ['8:6','7:5','1:4','2:3'],
            ['3:8','4:2','5:1','6:7'],
            ['8:7','1:6','2:5','3:4'],
            ['4:8','5:3','6:2','7:1']
    ],
    10: [
            ['1:10','2:9','3:8','4:7','5:6'],
            ['10:6','7:5','8:4','9:3','1:2'],
            ['2:10','3:1','4:9','5:8','6:7'],
            ['10:7','8:6','9:5','1:4','2:3'],
            ['3:10','4:2','5:1','6:9','7:8'],
            ['10:8','9:7','1:6','2:5','3:4'],
            ['4:10','5:3','6:2','7:1','8:9'],
            ['10:9','1:8','2:7','3:6','4:5'],
            ['5:10','6:4','7:3','8:2','9:1']
    ],
    12: [
        	['1:12','2:11','3:10','4:9','5:8','6:7'],
            ['12:7','8:6','9:5','10:4','11:3',' 1:2'],
            ['2:12','3:1','4:11','5:10','6:9','7:8'],
            ['12:8','9:7','10:6','11:5','1:4','2:3'],
            ['3:12','4:2','5:1','6:11','7:10',' 8:9'],
            ['12:9','10:8','11:7','1:6','2:5',' 3:4'],
            ['4:12','5:3','6:2','7:1','8:11',' 9:10'],
            ['12:10','11:9','1:8','2:7','3:6',' 4:5'],
            ['5:12','6:4','7:3','8:2','9:1',' 10:11'],
            ['12:11','1:10','2:9','3:8','4:7',' 5:6'],
            ['6:12','7:5','8:4','9:3','10:2',' 11:1']
    ],
    14: [
            ['1:14','2:13','3:12','4:11','5:10','6:9','7:8'],
            ['14:8','9:7','10:6','11:5','12:4','13:3','1:2'],
            ['2:14','3:1','4:13','5:12','6:11','7:10','8:9'],
            ['14:9','10:8','11:7','12:6','13:5','1:4','2:3'],
            ['3:14','4:2','5:1','6:13','7:12','8:11','9:10'],
            ['14:10','11:9','12:8','13:7','1:6','2:5','3:4'],
            ['4:14','5:3','6:2','7:1','8:13','9:12','10:11'],
            ['14:11','12:10','13:9','1:8','2:7','3:6','4:5'],
            ['5:14','6:4','7:3','8:2','9:1','10:13','11:12'],
            ['14:12','13:11','1:10','2:9','3:8','4:7','5:6'],
            ['6:14','7:5','8:4','9:3','10:2','11:1','12:13'],
            ['14:13','1:12','2:11','3:10','4:9','5:8','6:7'],
            ['7:14','8:6','9:5','10:4','11:3','12:2','13:1']
    ],
    16: [
            ['1:16','2:15','3:14','4:13','5:12','6:11','7:10','8:9'],
            ['16:9','10:8','11:7','12:6','13:5','14:4','15:3','1:2'],
            ['2:16','3:1','4:15','5:14','6:13','7:12','8:11','9:10'],
            ['16:10','11:9','12:8','13:7','14:6','15:5','1:4','2:3'],
            ['3:16','4:2','5:1','6:15','7:14','8:13','9:12','10:11'],
            ['16:11','12:10','13:9','14:8','15:7','1:6','2:5','3:4'],
            ['4:16','5:3','6:2','7:1','8:15','9:14','10:13','11:12'],
            ['16:12','13:11','14:10','15:9','1:8','2:7','3:6','4:5'],
            ['5:16','6:4','7:3','8:2','9:1','10:15','11:14','12:13'],
            ['16:13','14:12','15:11','1:10','2:9','3:8','4:7','5:6'],
            ['6:16','7:5','8:4','9:3','10:2','11:1','12:15','13:14'],
            ['16:14','15:13','1:12','2:11','3:10','4:9','5:8','6:7'],
            ['7:16','8:6','9:5','10:4','11:3','12:2','13:1','14:15'],
            ['16:15','1:14','2:13','3:12','4:11','5:10','6:9','7:8'],
            ['8:16','9:7','10:6','11:5','12:4','13:3','14:2','15:1']
    ],
    18: [
            ['1:18','2:17','3:16','4:15','5:14','6:13','7:12','8:11','9:10'],
            ['18:10','11:9','12:8','13:7','14:6','15:5','16:4','17:3','1:2'],
            ['2:18','3:1','4:17','5:16','6:15','7:14','8:13','9:12','10:11'],
            ['18:11','12:10','13:9','14:8','15:7','16:6','17:5','1:4','2:3'],
            ['3:18','4:2','5:1','6:17','7:16','8:15','9:14','10:13','11:12'],
            ['18:12','13:11','14:10','15:9','16:8','17:7','1:6','2:5','3:4'],
            ['4:18','5:3','6:2','7:1','8:17','9:16','10:15','11:14','12:13'],
            ['18:13','14:12','15:11','16:10','17:9','1:8','2:7','3:6','4:5'],
            ['5:18','6:4','7:3','8:2','9:1','10:17','11:16','12:15','13:14'],
            ['18:14','15:13','16:12','17:11','1:10','2:9','3:8','4:7','5:6'],
            ['6:18','7:5','8:4','9:3','10:2','11:1','12:17','13:16','14:15'],
            ['18:15','16:14','17:13','1:12','2:11','3:10','4:9','5:8','6:7'],
            ['7:18','8:6','9:5','10:4','11:3','12:2','13:1','14:17','15:16'],
            ['18:16','17:15','1:14','2:13','3:12','4:11','5:10','6:9','7:8'],
            ['8:18','9:7','10:6','11:5','12:4','13:3','14:2','15:1','16:17'],
            ['18:17','1:16','2:15','3:14','4:13','5:12','6:11','7:10','8:9'],
            ['9:18','10:8','11:7','12:6','13:5','14:4','15:3','16:2','17:1']
    ]
};

module.exports = ROUNDS_BERGER;
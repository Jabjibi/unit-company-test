def process_matrix(matrix, name):
    result = []
    num_cols = len(matrix[0])
    for col in range(num_cols):
        if col % 2 == 0:
            # บนลงล่าง
            for row in range(len(matrix)):
                result.append(matrix[row][col])
        else:
            # ล่างขึ้นบน
            for row in reversed(range(len(matrix))):
                result.append(matrix[row][col])
    print(f"{name}: {','.join(str(x) for x in result)}")

matrix1 = [
    [7,2,0,1,0,2,9],
    [8,4,8,6,9,3,3],
    [7,8,8,8,9,0,6],
    [4,7,2,7,0,0,7],
    [6,5,7,8,0,7,2],
    [8,1,8,5,4,5,2]
]

matrix2 = [
    [7, 2, 0],
    [8, 4, 8],
    [7, 8, 8]
]

matrix3 = [
    [7,2,0],
    [8,4,8]
]

# เรียกใช้ฟังก์ชันกับแต่ละ matrix
print("\nTurtle Walking")
process_matrix(matrix1, "matrix1")
process_matrix(matrix2, "matrix2")
process_matrix(matrix3, "matrix3")

# def process_matrix(matrix, name):
#     result = []
#     num_cols = len(matrix[0])
#     for col in range(num_cols):
#         if col % 2 == 0:
#           for row in range(len(matrix)):  
#              result.append(matrix[row][col])
#         else:
#            for row in reversed(range(len(matrix))):
#               result.append(matrix[row][col])

#     print(f"{name}: {','.join(str(x) for x in result)}") 

# matrix2 = [
#     [7, 2, 0],
#     [8, 4, 8],
#     [7, 8, 8]
# ]

# process_matrix(matrix2, "matrix2")


def bricks_added(wall):
    total_bricks = 0
    prev_height = 0

    for height in wall:
        if height > prev_height:
            total_bricks += height - prev_height
        prev_height = height

    return total_bricks

print("case1 :",bricks_added([1,2,3,4,5,6]))


# [1, 2, 2, 1, 5, 6]
# 0 -> 1 = +1
# 1 -> 2 = +1
# 2 -> 2 = +0
# 2 -> 1 = +0
# 1 -> 5 = +4
# 5 -> 6 = +1
def bricks_added(wall):
    total_bricks = 0
    prev_height = 0  # เริ่มจากพื้น

    for height_curren in wall:
        if height_curren > prev_height:
            total_bricks += height_curren - prev_height
        prev_height = height_curren  # เดินไปตำแหน่งต่อไป

    return total_bricks

print("\nBrick on the Wall")
print("Case 1 :",bricks_added([1, 2, 3, 4, 5, 6]))
print("Case 2 :",bricks_added([1, 2, 2, 1, 5, 6]))
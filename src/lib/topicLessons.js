// Educational content for each grade's topics
// Each lesson has: title, explanation, steps[], examples[]

export const topicLessons = {
    '1': {
        counting: {
            title: 'Counting to 100',
            explanation: 'Counting means saying numbers in order. Each number is one more than the last.',
            steps: ['Start from any number', 'Add 1 to get the next number', 'Keep going in order'],
            examples: [
                { problem: 'What comes after 5?', solution: '5 → 6', answer: '6' },
                { problem: 'What comes after 19?', solution: '19 → 20', answer: '20' },
                { problem: 'What comes after 99?', solution: '99 → 100', answer: '100' },
            ]
        },
        addition: {
            title: 'Addition (within 20)',
            explanation: 'Addition means putting numbers together to get a bigger number. The "+" sign means add.',
            steps: ['Look at the first number', 'Count up by the second number', 'The total is your answer'],
            examples: [
                { problem: '3 + 2', solution: 'Start at 3, count up 2: 4, 5', answer: '5' },
                { problem: '7 + 5', solution: 'Start at 7, count up 5: 8, 9, 10, 11, 12', answer: '12' },
            ]
        },
        subtraction: {
            title: 'Subtraction (within 20)',
            explanation: 'Subtraction means taking away. The "−" sign means subtract.',
            steps: ['Start with the bigger number', 'Count back by the smaller number', 'Where you land is the answer'],
            examples: [
                { problem: '8 − 3', solution: 'Start at 8, count back 3: 7, 6, 5', answer: '5' },
                { problem: '15 − 7', solution: 'Start at 15, count back 7: 14, 13, 12, 11, 10, 9, 8', answer: '8' },
            ]
        },
        placevalue: {
            title: 'Place Value (tens & ones)',
            explanation: 'Every digit in a number has a place. The right digit is "ones" and the left digit is "tens".',
            steps: ['Look at the number', 'The right digit = ones', 'The left digit = tens'],
            examples: [
                { problem: 'How many tens in 34?', solution: '34 = 3 tens + 4 ones', answer: '3' },
                { problem: 'How many ones in 56?', solution: '56 = 5 tens + 6 ones', answer: '6' },
            ]
        },
        shapes: {
            title: 'Shapes (sides & corners)',
            explanation: 'Shapes have sides (flat edges) and corners (where sides meet). Each shape has a specific number.',
            steps: ['Identify the shape', 'Count the straight sides', 'Corners = same as sides'],
            examples: [
                { problem: 'Triangle', solution: '3 sides, 3 corners', answer: '3' },
                { problem: 'Square', solution: '4 sides, 4 corners', answer: '4' },
                { problem: 'Hexagon', solution: '6 sides, 6 corners', answer: '6' },
            ]
        },
        time: {
            title: 'Telling Time',
            explanation: 'A clock has two hands. The short hand shows the hour. The long hand shows the minutes.',
            steps: ['Look at the short hand for the hour', 'Look at the long hand for minutes', ':00 means the start of the hour'],
            examples: [
                { problem: 'Short hand on 3, long hand on 12', solution: 'Hour = 3, Minutes = 00', answer: '3:00' },
                { problem: '5:00 + 2 hours', solution: '5 + 2 = 7', answer: '7:00' },
            ]
        },
        wordproblems: {
            title: 'Basic Word Problems',
            explanation: 'Word problems tell a story with numbers. Read carefully to know if you add or subtract.',
            steps: ['Read the problem', '"Get more" or "total" = ADD', '"Left" or "eat" or "lose" = SUBTRACT'],
            examples: [
                { problem: 'You have 4 apples and get 3 more', solution: '4 + 3 = 7', answer: '7 apples' },
                { problem: 'You have 10 cookies and eat 4', solution: '10 − 4 = 6', answer: '6 cookies' },
            ]
        },
    },
    '2': {
        addition: { title: 'Addition (within 100)', explanation: 'Add bigger numbers by breaking them into tens and ones.', steps: ['Add the ones first', 'Add the tens', 'Combine both answers'], examples: [{ problem: '34 + 25', solution: '4+5=9, 30+20=50, 50+9=59', answer: '59' }] },
        subtraction: { title: 'Subtraction (within 100)', explanation: 'Subtract bigger numbers by working with tens and ones.', steps: ['Subtract the ones', 'Subtract the tens', 'Combine'], examples: [{ problem: '67 − 23', solution: '7−3=4, 60−20=40, 40+4=44', answer: '44' }] },
        skipcounting: { title: 'Skip Counting', explanation: 'Skip counting means counting by 2s, 5s, or 10s instead of 1s.', steps: ['Pick the skip number (2, 5, or 10)', 'Add that number each time'], examples: [{ problem: 'Count by 5s: 10, 15, ?', solution: '15 + 5 = 20', answer: '20' }] },
        placevalue: { title: 'Place Value (hundreds)', explanation: 'In a 3-digit number: left=hundreds, middle=tens, right=ones.', steps: ['Hundreds digit × 100', 'Tens digit × 10', 'Ones digit × 1'], examples: [{ problem: 'How many hundreds in 472?', solution: '472 = 4 hundreds', answer: '4' }] },
        money: { title: 'Money (coins & dollars)', explanation: 'Quarter=25¢, Dime=10¢, Nickel=5¢, Penny=1¢', steps: ['Count quarters (×25)', 'Count dimes (×10)', 'Count nickels (×5)', 'Add them all'], examples: [{ problem: '2 quarters + 3 dimes', solution: '50 + 30 = 80', answer: '80 cents' }] },
        measurement: { title: 'Measurement', explanation: '1 foot = 12 inches. Multiply feet by 12 to get inches.', steps: ['Number of feet × 12 = inches'], examples: [{ problem: '3 feet = ? inches', solution: '3 × 12 = 36', answer: '36 inches' }] },
        time: { title: 'Time (quarter hours)', explanation: '1 hour = 60 minutes. Half hour = 30 minutes.', steps: ['Count the hours', 'Count the minutes', 'Add them together'], examples: [{ problem: 'How many minutes in 1 hour?', solution: '1 hour = 60 minutes', answer: '60' }] },
    },
    '3': {
        multiplication: { title: 'Multiplication (×1-10)', explanation: 'Multiplication is repeated addition. 3 × 4 means "3 groups of 4".', steps: ['Think of groups', '3 × 4 = 4 + 4 + 4', 'Or memorize times tables!'], examples: [{ problem: '6 × 7', solution: '6 groups of 7 = 42', answer: '42' }, { problem: '8 × 9', solution: '8 groups of 9 = 72', answer: '72' }] },
        division: { title: 'Division (÷1-10)', explanation: 'Division splits a number into equal groups. 12 ÷ 3 means "12 split into 3 groups".', steps: ['Think: what times the divisor = the dividend?', '12 ÷ 3 → 3 × ? = 12 → 4'], examples: [{ problem: '24 ÷ 6', solution: '6 × 4 = 24', answer: '4' }] },
        fractions: { title: 'Fractions (½, ⅓, ¼)', explanation: 'A fraction shows parts of a whole. Top number = parts you have. Bottom = total parts.', steps: ['Bottom number = how many equal pieces', 'Top number = how many pieces you take', 'To find fraction of a number: divide by bottom, multiply by top'], examples: [{ problem: '1/2 of 10', solution: '10 ÷ 2 = 5', answer: '5' }, { problem: '2/3 of 12', solution: '12 ÷ 3 = 4, 4 × 2 = 8', answer: '8' }] },
        rounding: { title: 'Rounding', explanation: 'Rounding makes numbers simpler. Look at the digit to the right of the place you\'re rounding to.', steps: ['Find the rounding place', 'Look at the digit to its right', '0-4 = round down, 5-9 = round up'], examples: [{ problem: 'Round 37 to nearest ten', solution: '7 ≥ 5, round up → 40', answer: '40' }, { problem: 'Round 342 to nearest hundred', solution: '4 < 5, round down → 300', answer: '300' }] },
        perimeter: { title: 'Perimeter', explanation: 'Perimeter = the distance around a shape. Add all the sides!', steps: ['Rectangle: P = 2 × Length + 2 × Width', 'Or P = 2 × (L + W)'], examples: [{ problem: 'Rectangle L=5, W=3', solution: 'P = 2×(5+3) = 2×8 = 16', answer: '16' }] },
        multidigitadd: { title: 'Multi-digit Addition', explanation: 'Line up the numbers and add column by column, right to left. Carry when over 9.', steps: ['Add ones column', 'Carry if needed', 'Add tens, then hundreds'], examples: [{ problem: '157 + 284', solution: '7+4=11 (carry 1), 5+8+1=14 (carry 1), 1+2+1=4 → 441', answer: '441' }] },
        multidigitsub: { title: 'Multi-digit Subtraction', explanation: 'Line up and subtract right to left. Borrow when the top digit is smaller.', steps: ['Subtract ones', 'Borrow if needed', 'Subtract tens, then hundreds'], examples: [{ problem: '503 − 267', solution: 'Borrow: 503→4,9,13 → 13−7=6, 9−6=3, 4−2=2 → 236', answer: '236' }] },
    },
    '4': {
        multidigitmult: { title: 'Multi-digit Multiplication', explanation: 'Break the problem into smaller multiplications and add results.', steps: ['Multiply by ones digit', 'Multiply by tens digit (add 0)', 'Add both results'], examples: [{ problem: '23 × 14', solution: '23×4=92, 23×10=230, 92+230=322', answer: '322' }] },
        longdivision: { title: 'Long Division', explanation: 'Divide step by step: Divide, Multiply, Subtract, Bring down.', steps: ['How many times does divisor go into first digits?', 'Multiply and subtract', 'Bring down next digit, repeat'], examples: [{ problem: '96 ÷ 4', solution: '4 goes into 9 → 2 times (8), 9−8=1, bring down 6 → 16, 4×4=16', answer: '24' }] },
        equivfractions: { title: 'Equivalent Fractions', explanation: 'Multiply or divide both top and bottom by the same number.', steps: ['Find what the bottom was multiplied by', 'Multiply the top by the same number'], examples: [{ problem: '2/3 = ?/9', solution: '3×3=9, so 2×3=6', answer: '6' }] },
        addfractions: { title: 'Adding Fractions', explanation: 'Fractions must have the same bottom number (denominator) to add.', steps: ['Make sure denominators match', 'Add the numerators', 'Keep the denominator', 'Simplify if possible'], examples: [{ problem: '1/4 + 2/4', solution: '(1+2)/4 = 3/4', answer: '3/4' }] },
        area: { title: 'Area & Perimeter', explanation: 'Area = space inside a shape. For rectangles: A = Length × Width.', steps: ['Area = L × W', 'Perimeter = 2×(L + W)'], examples: [{ problem: 'Area: L=6, W=4', solution: '6 × 4 = 24', answer: '24 sq units' }] },
        angles: { title: 'Angles', explanation: 'All angles in a triangle add up to 180°.', steps: ['Add the known angles', 'Subtract from 180°'], examples: [{ problem: '60° + 70° + ?° = 180°', solution: '180 − 60 − 70 = 50', answer: '50°' }] },
        factors: { title: 'Factors & Multiples', explanation: 'Factors divide evenly into a number. Multiples are the times table of a number.', steps: ['Factors: what × what = the number?', 'GCF: largest factor two numbers share'], examples: [{ problem: 'GCF of 12 and 18', solution: 'Factors of 12: 1,2,3,4,6,12 / 18: 1,2,3,6,9,18 → GCF=6', answer: '6' }] },
    },
    '5': {
        multfractions: { title: 'Multiplying Fractions', explanation: 'Multiply tops together, multiply bottoms together. Then simplify.', steps: ['Multiply numerators: top × top', 'Multiply denominators: bottom × bottom', 'Simplify the result'], examples: [{ problem: '2/3 × 3/4', solution: '(2×3)/(3×4) = 6/12 = 1/2', answer: '1/2' }, { problem: '1/2 × 2/5', solution: '(1×2)/(2×5) = 2/10 = 1/5', answer: '1/5' }] },
        divfractions: { title: 'Dividing Fractions', explanation: 'To divide fractions, flip the second fraction and multiply! (Keep-Change-Flip)', steps: ['Keep the first fraction', 'Change ÷ to ×', 'Flip the second fraction', 'Multiply across'], examples: [{ problem: '1/2 ÷ 3/4', solution: '1/2 × 4/3 = 4/6 = 2/3', answer: '2/3' }] },
        addfractionsunlike: { title: 'Adding Fractions (Unlike)', explanation: 'You need a common denominator to add fractions. Multiply to make bottoms the same.', steps: ['Find a common multiple for the bottoms', 'Convert both fractions', 'Add the tops, keep the bottom'], examples: [{ problem: '1/2 + 1/3', solution: '3/6 + 2/6 = 5/6', answer: '5/6' }] },
        subfractionsunlike: { title: 'Subtracting Fractions (Unlike)', explanation: 'Find a common denominator first, then subtract the numerators.', steps: ['Find common denominator', 'Convert fractions', 'Subtract the tops'], examples: [{ problem: '3/4 − 1/2', solution: '3/4 − 2/4 = 1/4', answer: '1/4' }] },
        adddecimals: { title: 'Adding Decimals', explanation: 'Line up the decimal points and add like normal numbers.', steps: ['Line up the decimal points', 'Add from right to left', 'Put decimal point in the answer'], examples: [{ problem: '3.5 + 2.7', solution: '3.5 + 2.7 = 6.2', answer: '6.2' }] },
        subdecimals: { title: 'Subtracting Decimals', explanation: 'Line up decimal points and subtract.', steps: ['Line up decimals', 'Subtract right to left', 'Borrow if needed'], examples: [{ problem: '8.4 − 3.6', solution: '8.4 − 3.6 = 4.8', answer: '4.8' }] },
        multdecimals: { title: 'Multiplying Decimals', explanation: 'Multiply normally, then count total decimal places.', steps: ['Ignore decimals, multiply the numbers', 'Count decimal places in both numbers', 'Put that many decimal places in your answer'], examples: [{ problem: '6 × 0.5', solution: '6 × 5 = 30, one decimal place → 3.0', answer: '3.0' }] },
        coordinateplane: { title: 'Coordinate Plane', explanation: 'A grid with x (horizontal) and y (vertical) axes. Points are written as (x, y).', steps: ['Start at origin (0,0)', 'Go right x steps', 'Go up y steps'], examples: [{ problem: 'Plot (3, 2)', solution: 'Right 3, Up 2', answer: '(3, 2)' }] },
        powersof10: { title: 'Powers of 10', explanation: '10 with an exponent tells you how many zeros there are.', steps: ['10¹ = 10, 10² = 100, 10³ = 1000', 'Multiply by 10³ = move decimal right 3 spots'], examples: [{ problem: '10³', solution: '10 × 10 × 10 = 1000', answer: '1000' }] },
        orderops: { title: 'Order of Operations', explanation: 'PEMDAS: Parentheses, Exponents, Multiply/Divide, Add/Subtract (left to right).', steps: ['P - Parentheses first', 'E - Exponents', 'M/D - Multiply & Divide left to right', 'A/S - Add & Subtract left to right'], examples: [{ problem: '3 + 4 × 2', solution: 'Multiply first: 4×2=8, then 3+8=11', answer: '11' }, { problem: '(2+3) × 4', solution: 'Parentheses: 5, then 5×4=20', answer: '20' }] },
        volume: { title: 'Volume', explanation: 'Volume = how much space a 3D shape takes up. Box: V = L × W × H.', steps: ['Multiply length × width × height'], examples: [{ problem: 'Box: 3 × 4 × 5', solution: '3 × 4 = 12, 12 × 5 = 60', answer: '60 cubic units' }] },
        classifyshapes: { title: 'Classifying Shapes', explanation: 'Group shapes by properties (sides, angles).', steps: ['Triangle types: Equilateral (3 equal sides), Isosceles (2 equal)', 'Quadrilaterals: Trapezoid, Parallelogram, Rhombus'], examples: [{ problem: '4 equal sides, 4 right angles', solution: 'Square', answer: 'Square' }] },
        convertmeasure: { title: 'Converting Measurements', explanation: 'Change units by multiplying or dividing.', steps: ['Big to small unit: Multiply', 'Small to big unit: Divide', '1 m = 100 cm, 1 km = 1000 m'], examples: [{ problem: '2 meters in cm', solution: '2 × 100 = 200', answer: '200 cm' }] },
        numexpressions: { title: 'Numerical Expressions', explanation: 'Write math phrases as numbers and symbols.', steps: ['"Sum of 8 and 7" → 8 + 7', '"Product of 5 and 2" → 5 × 2'], examples: [{ problem: 'Add 8 and 7, then multiply by 2', solution: '(8 + 7) × 2', answer: '(8 + 7) × 2' }] },
    },
    '6': {
        ratios: { title: 'Ratios & Rates', explanation: 'A ratio compares two numbers. A rate compares with different units (like price per item).', steps: ['Unit rate = total ÷ number of items'], examples: [{ problem: '8 items cost $24. Price per item?', solution: '$24 ÷ 8 = $3', answer: '$3' }] },
        percent: { title: 'Percent of a Number', explanation: 'Percent means "per 100". To find a percent: multiply by the decimal form.', steps: ['Convert % to decimal (÷ 100)', 'Multiply by the number'], examples: [{ problem: '25% of 80', solution: '0.25 × 80 = 20', answer: '20' }, { problem: '10% of 150', solution: '0.10 × 150 = 15', answer: '15' }] },
        integers: { title: 'Integer Operations', explanation: 'Integers include negatives. Same signs → positive, different signs → negative.', steps: ['Adding same sign: add, keep the sign', 'Adding different signs: subtract, keep larger sign', 'Subtracting: add the opposite'], examples: [{ problem: '(-3) + (-5)', solution: 'Same sign: 3+5=8, keep negative', answer: '-8' }, { problem: '(-7) + 4', solution: 'Different: 7−4=3, keep negative', answer: '-3' }] },
        expressions: { title: 'Evaluating Expressions', explanation: 'Replace the variable with its value and calculate.', steps: ['Substitute the value for the variable', 'Follow order of operations'], examples: [{ problem: 'If x=3, what is 4x+5?', solution: '4(3)+5 = 12+5 = 17', answer: '17' }] },
        areatriangle: { title: 'Area of Triangles', explanation: 'Area of a triangle = (base × height) ÷ 2', steps: ['Multiply base × height', 'Divide by 2'], examples: [{ problem: 'base=8, height=6', solution: '(8×6)/2 = 48/2 = 24', answer: '24 sq units' }] },
        onestepeq: { title: 'One-step Equations', explanation: 'Do the opposite operation to both sides to find x.', steps: ['If x + a = b, then x = b − a', 'If x − a = b, then x = b + a'], examples: [{ problem: 'x + 7 = 15', solution: 'x = 15 − 7 = 8', answer: 'x = 8' }] },
    },
    '7': {
        proportions: { title: 'Proportions', explanation: 'A proportion says two ratios are equal. Cross-multiply to solve.', steps: ['a/b = c/d', 'Cross multiply: a×d = b×c', 'Solve for the unknown'], examples: [{ problem: '2/3 = x/12', solution: '2×12 = 3×x → 24 = 3x → x=8', answer: 'x = 8' }] },
        percentchange: { title: 'Percent Change', explanation: 'Increase: add the percent amount. Decrease: subtract it.', steps: ['Find the amount: original × percent', 'Add (increase) or subtract (decrease)'], examples: [{ problem: '100 increased by 20%', solution: '100 × 0.20 = 20, 100+20=120', answer: '120' }] },
        rationalnums: { title: 'Rational Number Operations', explanation: 'Multiplying integers: positive × positive = positive, negative × negative = positive, mixed = negative.', steps: ['Same signs → positive result', 'Different signs → negative result'], examples: [{ problem: '(-4) × (-3)', solution: 'Same signs → positive: 12', answer: '12' }, { problem: '(-5) × 6', solution: 'Different signs → negative: −30', answer: '-30' }] },
        twostepeq: { title: 'Two-step Equations', explanation: 'Undo addition/subtraction first, then undo multiplication/division.', steps: ['Move the constant (add/subtract)', 'Then divide by the coefficient'], examples: [{ problem: '3x + 5 = 20', solution: '3x = 20−5 = 15, x = 15÷3 = 5', answer: 'x = 5' }] },
        circumference: { title: 'Circumference', explanation: 'Circumference = distance around a circle = 2πr or πd.', steps: ['C = 2 × π × radius', 'Use π ≈ 3.14'], examples: [{ problem: 'r = 5', solution: 'C = 2 × 3.14 × 5 = 31.4 ≈ 31', answer: '≈ 31' }] },
        areacircle: { title: 'Area of Circles', explanation: 'Area of a circle = π × r².', steps: ['Square the radius: r × r', 'Multiply by π (≈3.14)'], examples: [{ problem: 'r = 4', solution: 'A = 3.14 × 16 = 50.24 ≈ 50', answer: '≈ 50' }] },
    },
    '8': {
        lineareq: { title: 'Linear Equations', explanation: 'Isolate x by doing opposite operations.', steps: ['Move constants to one side', 'Divide by coefficient of x'], examples: [{ problem: '5x + 3 = 28', solution: '5x = 25, x = 5', answer: 'x = 5' }] },
        slope: { title: 'Slope', explanation: 'Slope = rise/run = (y₂−y₁)/(x₂−x₁). It measures steepness.', steps: ['Find the change in y (rise)', 'Find the change in x (run)', 'Divide rise ÷ run'], examples: [{ problem: '(1,2) to (3,8)', solution: 'Rise=8−2=6, Run=3−1=2, Slope=6/2=3', answer: '3' }] },
        pythag: { title: 'Pythagorean Theorem', explanation: 'In a right triangle: a² + b² = c² (c is the longest side).', steps: ['Square both legs', 'Add them together', 'Take the square root for c'], examples: [{ problem: 'a=3, b=4, c=?', solution: '9 + 16 = 25, √25 = 5', answer: 'c = 5' }] },
        exponents: { title: 'Exponents', explanation: 'An exponent tells you how many times to multiply a number by itself.', steps: ['2³ means 2 × 2 × 2', 'Multiply step by step'], examples: [{ problem: '5² = ?', solution: '5 × 5 = 25', answer: '25' }, { problem: '2⁴', solution: '2×2×2×2 = 16', answer: '16' }] },
        sqroots: { title: 'Square Roots', explanation: 'Square root asks: what number × itself = this?', steps: ['√n = what × what = n?', 'Memorize perfect squares: 4,9,16,25,36,49,64,81,100...'], examples: [{ problem: '√81', solution: '9 × 9 = 81', answer: '9' }] },
        scinotation: { title: 'Scientific Notation', explanation: 'A shorthand for big numbers: coefficient × 10^power.', steps: ['Move decimal to get a number between 1-10', 'Count how many places you moved = exponent'], examples: [{ problem: '3 × 10⁴', solution: '3 × 10000 = 30000', answer: '30000' }] },
    },
    '9': {
        multistepeq: { title: 'Multi-step Equations', explanation: 'Combine like terms, then isolate the variable step by step.', steps: ['Distribute if needed', 'Combine like terms', 'Move variables to one side', 'Solve'], examples: [{ problem: '4x + 7 = 31', solution: '4x = 24, x = 6', answer: 'x = 6' }] },
        inequalities: { title: 'Inequalities', explanation: 'Solve like equations, but flip the sign when multiplying/dividing by negative.', steps: ['Isolate the variable', 'If you multiply/divide by negative, flip the inequality'], examples: [{ problem: '3x + 2 > 11', solution: '3x > 9, x > 3', answer: 'x > 3' }] },
        polyadd: { title: 'Adding Polynomials', explanation: 'Combine like terms (same variable and exponent).', steps: ['Group terms with same power', 'Add the coefficients'], examples: [{ problem: '(3x+2) + (5x+4)', solution: '(3+5)x + (2+4) = 8x + 6', answer: '8x + 6' }] },
        polymult: { title: 'Multiplying Polynomials', explanation: 'Use FOIL for binomials: First, Outside, Inside, Last.', steps: ['First: x×x', 'Outside: x×b', 'Inside: a×x', 'Last: a×b', 'Combine like terms'], examples: [{ problem: '(x+2)(x+3)', solution: 'x²+3x+2x+6 = x²+5x+6', answer: 'x²+5x+6' }] },
        factoring: { title: 'Factoring', explanation: 'Reverse of multiplying. Find two numbers that multiply to c and add to b.', steps: ['x² + bx + c', 'Find two numbers: multiply=c, add=b', 'Write as (x+?)(x+?)'], examples: [{ problem: 'x²+7x+12', solution: '3×4=12, 3+4=7 → (x+3)(x+4)', answer: '(x+3)(x+4)' }] },
        functions: { title: 'Functions', explanation: 'A function f(x) gives one output for each input x.', steps: ['Replace x with the given value', 'Calculate'], examples: [{ problem: 'f(x)=2x+1, f(4)=?', solution: '2(4)+1 = 9', answer: '9' }] },
        quadbasics: { title: 'Quadratic Basics', explanation: 'If x² = n, then x = √n (positive root).', steps: ['Take the square root of both sides'], examples: [{ problem: 'x² = 49', solution: '√49 = 7', answer: 'x = 7' }] },
    },
    '10': {
        quadratic: { title: 'Quadratic Equations', explanation: 'Use factoring, completing the square, or the quadratic formula.', steps: ['Standard form: ax²+bx+c=0', 'Factor or use formula: x = (-b±√(b²-4ac))/(2a)'], examples: [{ problem: 'x²=64', solution: 'x = √64 = 8', answer: 'x = 8' }] },
        radicals: { title: 'Radicals & Roots', explanation: 'Simplify by finding perfect square factors.', steps: ['Find the largest perfect square that divides the number', 'Take its root out'], examples: [{ problem: '√144', solution: '12 × 12 = 144', answer: '12' }] },
        arithseq: { title: 'Arithmetic Sequences', explanation: 'Each term increases by a constant "d". aₙ = a₁ + (n-1)d.', steps: ['Find a₁ (first term) and d (common difference)', 'Plug into formula: aₙ = a₁ + (n−1)×d'], examples: [{ problem: 'a₁=3, d=5, find a₆', solution: '3 + (6−1)×5 = 3+25 = 28', answer: '28' }] },
        geomseq: { title: 'Geometric Sequences', explanation: 'Each term is multiplied by a constant "r". aₙ = a₁ × r^(n-1).', steps: ['Find a₁ and r (common ratio)', 'aₙ = a₁ × r^(n−1)'], examples: [{ problem: 'a₁=2, r=3, find a₄', solution: '2 × 3³ = 2×27 = 54', answer: '54' }] },
        trig: { title: 'Basic Trigonometry', explanation: 'SOH-CAH-TOA: sin=opp/hyp, cos=adj/hyp, tan=opp/adj.', steps: ['Identify opposite, adjacent, hypotenuse', 'Pick the right ratio'], examples: [{ problem: 'opp=3, hyp=5, sin=?', solution: 'sin = 3/5', answer: '3/5' }] },
        rationalexpr: { title: 'Rational Expressions', explanation: 'Simplify by finding the GCF of numerator and denominator.', steps: ['Factor top and bottom', 'Cancel common factors'], examples: [{ problem: '6/10 simplified', solution: 'GCF=2 → 3/5', answer: '3/5' }] },
    },
    '11': {
        logarithms: { title: 'Logarithms', explanation: 'log base b of x = y means b^y = x. "What power gives me x?"', steps: ['log_b(x) = y → b^y = x', 'Think: b to what power = x?'], examples: [{ problem: 'log₂(8)', solution: '2³ = 8', answer: '3' }, { problem: 'log₁₀(1000)', solution: '10³ = 1000', answer: '3' }] },
        trigidentities: { title: 'Trig Identities', explanation: 'Key identity: sin²θ + cos²θ = 1. Memorize common angle values.', steps: ['sin²θ + cos²θ = 1', 'sin(30°)=1/2, cos(60°)=1/2', 'tan(45°)=1'], examples: [{ problem: 'sin²θ + cos²θ = ?', solution: 'Always = 1', answer: '1' }] },
        permutations: { title: 'Permutations & Combinations', explanation: 'P(n,r) = order matters. C(n,r) = order doesn\'t matter.', steps: ['P(n,2) = n × (n−1)', 'C(n,2) = n×(n−1) / 2'], examples: [{ problem: 'C(5,2)', solution: '5×4/2 = 10', answer: '10' }] },
        conics: { title: 'Conic Sections', explanation: 'Circle equation: x²+y²=r². The radius is √(r²).', steps: ['x²+y²=r² → radius = r'], examples: [{ problem: 'x²+y²=25, radius=?', solution: '√25 = 5', answer: '5' }] },
        polydiv: { title: 'Polynomial Division', explanation: 'Divide polynomials using synthetic or long division.', steps: ['Set up long division', 'Divide leading terms', 'Multiply, subtract, bring down'], examples: [{ problem: '(x²+5x+6) ÷ (x+2)', solution: 'x+3 (since (x+2)(x+3)=x²+5x+6)', answer: 'x + 3' }] },
        expfunctions: { title: 'Exponential Functions', explanation: 'f(x) = a^x grows (or shrinks) by a constant factor.', steps: ['Substitute the exponent', 'Calculate the power'], examples: [{ problem: '3⁴', solution: '3×3×3×3 = 81', answer: '81' }] },
    },
    '12': {
        limits: { title: 'Limits', explanation: 'A limit finds what value a function approaches. Factor and simplify to find it.', steps: ['Try plugging in the value', 'If 0/0, factor and cancel', 'Then plug in again'], examples: [{ problem: 'lim(x→3) (x²−9)/(x−3)', solution: 'Factor: (x+3)(x−3)/(x−3) = x+3 → 3+3=6', answer: '6' }] },
        derivatives: { title: 'Derivatives', explanation: 'The derivative measures rate of change. Power rule: d/dx[xⁿ] = nxⁿ⁻¹.', steps: ['Bring the exponent down as coefficient', 'Reduce the exponent by 1'], examples: [{ problem: 'd/dx[3x²]', solution: '2×3 x¹ = 6x', answer: '6x' }, { problem: 'd/dx[5x³]', solution: '3×5 x² = 15x²', answer: '15x²' }] },
        integrals: { title: 'Integrals', explanation: 'Integration is the reverse of differentiation. ∫xⁿdx = xⁿ⁺¹/(n+1) + C.', steps: ['Add 1 to the exponent', 'Divide by the new exponent', 'Add + C for indefinite integrals'], examples: [{ problem: '∫x² dx', solution: 'x³/3 + C', answer: 'x³/3 + C' }] },
        matrices: { title: 'Matrices (determinant)', explanation: 'For a 2×2 matrix |a b|/|c d|, det = ad − bc.', steps: ['Multiply diagonals: a×d and b×c', 'Subtract: ad − bc'], examples: [{ problem: 'det |3 2|/|1 4|', solution: '3×4 − 2×1 = 12−2 = 10', answer: '10' }] },
        complexnums: { title: 'Complex Numbers', explanation: 'Complex numbers have a real part and imaginary part (i = √-1).', steps: ['Add real parts together', 'Add imaginary parts together'], examples: [{ problem: '(3+2i) + (5+4i)', solution: 'Real: 3+5=8, Imaginary: 2+4=6i', answer: '8+6i' }] },
        powerrule: { title: 'Power Rule', explanation: 'To differentiate axⁿ: new coefficient = a×n.', steps: ['Multiply coefficient by exponent', 'Reduce exponent by 1'], examples: [{ problem: 'd/dx[4x³]', solution: '3×4 = 12 → 12x²', answer: '12x²' }] },
    },
};

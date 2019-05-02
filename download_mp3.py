import os
import urllib.request

# This script downloads these .mag files if not already present.
mp3_files = [
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A000010.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A000120.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A001223.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A003602.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A004718.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A005132.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A005185.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A006577.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A007318.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A025480.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A056239.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A117153.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A220952.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A258200.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A276204.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A276207.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A279125.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A281488.mp3',
    'https://imaginaryexhibits.s3.amazonaws.com/oeis-player/mp3-192kbps/A318921.mp3',
]

for mp3_file in mp3_files:
  output_file = os.path.join('./dist/apps/oeis/common/cache', mp3_file.split('/')[-1])
  if os.path.exists(output_file):
    print("File {} already present".format(mp3_file))
  else:
    print("Writing {} to {}".format(mp3_file, output_file))
    urllib.request.urlretrieve(mp3_file, output_file)

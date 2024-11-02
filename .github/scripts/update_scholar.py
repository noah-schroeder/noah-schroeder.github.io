from scholarly import scholarly
import json
from datetime import datetime
import os
import sys

def extract_journal_from_citation(citation):
  if not citation:
      return 'Publication Venue Not Available'
  
  # Split by comma and take the first part (usually contains the journal name)
  parts = citation.split(',')
  if len(parts) > 0:
      return parts[0].strip()
  return 'Publication Venue Not Available'

def update_scholar_stats():
  try:
      # Replace with your Google Scholar profile ID
      author = scholarly.search_author_id('W-Ij6voAAAAJ')
      author = scholarly.fill(author)
      
      # Get basic stats
      stats = {
          'citations': author['citedby'],
          'h_index': author['hindex'],
          'publications': len(author['publications']),
          'last_updated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
          'recent_publications': []
      }
      
      # Sort publications by year
      publications = author['publications']
      publications.sort(key=lambda x: int(x['bib'].get('pub_year', '0')), reverse=True)
      
      # Get 3 most recent publications
      for i, pub in enumerate(publications[:3]):
          filled_pub = scholarly.fill(pub)
          
          # Extract journal name from citation field
          citation = filled_pub['bib'].get('citation', '')
          venue = extract_journal_from_citation(citation)
          
          pub_data = {
              'title': filled_pub['bib']['title'],
              'year': filled_pub['bib'].get('pub_year', 'Year Unknown'),
              'journal': venue,
              'url': filled_pub.get('pub_url', '#'),
              'authors': filled_pub['bib'].get('author', [])
          }
          stats['recent_publications'].append(pub_data)
          
          # Debug print
          print(f"\nProcessing publication:")
          print(f"Title: {pub_data['title']}")
          print(f"Year: {pub_data['year']}")
          print(f"Citation: {citation}")
          print(f"Extracted Venue: {venue}")
          print("---")
          
      # Create data directory if it doesn't exist
      os.makedirs('assets/data', exist_ok=True)
      
      # Save to JSON using absolute path from repository root
      json_path = os.path.join(os.getcwd(), 'assets/data/scholar_stats.json')
      with open(json_path, 'w', encoding='utf-8') as f:
          json.dump(stats, f, ensure_ascii=False, indent=2)
          
      print("Successfully updated scholar stats and publications")
      print(f"JSON file saved to: {json_path}")
      
  except Exception as e:
      print(f"Error updating scholar stats: {str(e)}")
      raise e

if __name__ == "__main__":
  update_scholar_stats()
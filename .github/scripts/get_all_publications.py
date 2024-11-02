from scholarly import scholarly
import json
import time
import sys
import os

def extract_journal_from_citation(citation):
  if citation:
      # Try to get the journal name before the first comma
      parts = citation.split(',')
      if len(parts) > 0:
          return parts[0].strip()
  return "Publication Venue Not Available"

def get_all_publications(scholar_id):
  try:
      # Retrieve the author's data
      search_query = scholarly.search_author_id(scholar_id)
      author = scholarly.fill(search_query)
      
      # Get all publications
      publications = []
      
      for pub in author['publications']:
          try:
              # Fill in the publication details
              pub_filled = scholarly.fill(pub)
              
              # Extract relevant information
              pub_data = {
                  'title': pub_filled.get('bib', {}).get('title', 'Title Not Available'),
                  'citation': pub_filled.get('bib', {}).get('citation', 'Citation Not Available'),
                  'year': pub_filled.get('bib', {}).get('pub_year', 'Year Not Available'),
                  'abstract': pub_filled.get('bib', {}).get('abstract', 
                            pub_filled.get('abstract', 'Abstract Not Available')),
                  'url': pub_filled.get('pub_url', '#'),
                  'citations': pub_filled.get('num_citations', 0)
              }
              
              # Extract journal name from citation
              pub_data['venue'] = extract_journal_from_citation(pub_data['citation'])
              
              publications.append(pub_data)
              
              # Add a small delay to avoid hitting rate limits
              time.sleep(1)
              
          except Exception as e:
              print(f"Error processing publication: {e}")
              continue
      
      # Save to a different JSON file than the recent publications
      with open('scholar_all_publications.json', 'w', encoding='utf-8') as f:
          json.dump({
              'last_updated': time.strftime('%Y-%m-%d %H:%M:%S'),
              'publications': publications
          }, f, ensure_ascii=False, indent=2)
          
      print(f"Successfully retrieved {len(publications)} publications")
      return True
      
  except Exception as e:
      print(f"Error retrieving publications: {e}")
      return False

if __name__ == "__main__":
  # Replace with your Google Scholar ID
  SCHOLAR_ID = "W-Ij6voAAAAJ"
  get_all_publications(SCHOLAR_ID)